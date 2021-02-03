const Automaton = ( function () {
    let pointer_x = 0, pointer_y = 0;

    const evolveWord = ( word ) => {
        let tally = {};

        word .split ( '' ) .forEach ( character => {
            tally [ character ]
                = Object.keys ( tally ) .indexOf ( character )
                    !== -1
                    ? tally [ character ] + 1
                    : 1;
        } );

        return Object.keys ( tally )
            .sort ()
            .map  (
                character => [
                    tally [ character ]
                        < 10
                        ? tally [ character ]
                        : '0',
                    character
                ]
                .join ( '' )
            )
            .join ( '' );
    }

    const workOutNewX = ( word, new_word, original_x ) =>
        new_word > word
        ? original_x - 1
        : (
            new_word < word
            ? original_x + 1
            : original_x
        );

    const workOutNewY = ( word, new_word, original_y ) =>
        new_word.length > word.length
        ? original_y + 1
        : (
            new_word.length < word.length
            ? original_y - 1
            : original_y
        );

    const mergeWordWithScreen = ( word, x, y ) => {
        return word .split ( '' )
            .map (
                ( character, index ) => {
                    let new_character_raw
                        = parseInt (
                            snapshot ( x + index, y, 1, 1 )
                                .toString ()
                        )
                        + parseInt ( character );
                    return new_character_raw < 10
                        ? new_character_raw.toString ()
                        : '0';
                }
            )
            .join ( '' );
    }

    const displayWord = ( word, new_word ) => {
        let original_x = getX () - word.length;
        let original_y = pointer_y; // just an alias

        let new_x = workOutNewX ( word, new_word, original_x );
        let new_y = workOutNewY ( word, new_word, original_y );

        let merged_word = mergeWordWithScreen ( new_word, new_x, new_y );
        label ( new_x, new_y, merged_word, { update: true } );
        return merged_word;
    }

    const incrementGeneration = () => {
        let word = getCurrentWord ();
        return displayWord ( word, evolveWord ( word ) );
    }

    const getCurrentWord = () => {
        let word_x = getX ();
        let word_y = getY ();

        let word = "";

        let current_char;

        while (
            (
                current_char
                    = snapshot ( getX (), getY (), 1, 1 ) .toString ()
            )
            === '0'
        ) {
            incrementPointer ();
        }

        while (
            (
                current_char
                    = snapshot ( getX (), getY (), 1, 1 ) .toString ()
            )
            !== '0'
        ) {
            word += current_char;

            incrementPointer ();
        }

        incrementPointer ();

        return word;
    }

    const setInitialState = ( x, y, string ) => {
        label ( x, y, string, { update: true } );

        setX ( x );
        setY ( y );
    }

    const getX = () => pointer_x;
    
    const getY = () => pointer_y;

    const setX = ( value ) => {
        pointer_x = value;
    }

    const setY = ( value ) => {
        pointer_y = value;
    }

    const incrementPointer = () => {
        if ( ++pointer_x > CHARS_ACROSS ) ++pointer_y;
        pointer_x = pointer_x % CHARS_ACROSS;
        pointer_y = pointer_y % CHARS_DOWN;
    }

    return {
        getCurrentWord:      getCurrentWord,
        evolveWord:          evolveWord,
        setInitialState:     setInitialState,
        incrementPointer:    incrementPointer,
        incrementGeneration: incrementGeneration,
        getX:                getX,
        getY:                getY
    };
} ) ();

function setup () {
    CHARS = [];

    rect (
        0,            0,
        CHARS_ACROSS, CHARS_DOWN,
        { fill: true, stroke: true, fillvalue: '0', strokevalue: '0' }
    );

    Automaton.setInitialState (
        Math.round ( CHARS_ACROSS / 2 ),
        Math.round ( CHARS_DOWN   / 2 ),
        '1'
    );

    updateDisplay ();

}

function windowResize () {
    CHARS = [];
}

function mouseMove ( e ) {
    // console.log ( e.clientX, e.clientY );
}

