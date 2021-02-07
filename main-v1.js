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

        //console.log ( word, tally );

        return Object.keys ( tally )
            .sort ()
            .map  (
                character => [
                    numberToCharacter ( tally [ character ] ),
                    character
                ]
                .join ( '' )
            )
            .join ( '' );
    }

    const workOutNewX = ( word, new_word, original_x ) =>
        new_word > word
        ? original_x + 1
        : (
            new_word < word
            ? original_x - 1
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
                        = characterToNumber (
                            snapshot ( x + index, y, 1, 1 )
                                .toString ()
                        )
                        + characterToNumber ( character );
                    return numberToCharacter ( new_character_raw );
                }
            )
            .join ( '' );
    }

    const displayWord = ( word, new_word ) => {
        let original_x = getX () - word.length;
        let original_y = pointer_y; // just an alias

        //console.log ( original_x, original_y );

        let new_x = workOutNewX ( word, new_word, original_x );
        let new_y = workOutNewY ( word, new_word, original_y );

        //console.log ( new_x, new_y );

        let merged_word = mergeWordWithScreen ( new_word, new_x, new_y );
        return { word: merged_word, x: new_x, y: new_y };
    }

    const incrementGeneration = () => {
        let word = getCurrentWord ();
        console.log ( word );

        let new_word = evolveWord ( word );
        console.log ( new_word );

        let merged_word = displayWord ( word, new_word );
        console.log ( merged_word );

        label ( merged_word.x, merged_word.y, merged_word.word, { update: true } );

//        let words_on_screen = snapshot ( 0, current_y, CHARS_ACROSS, 1).toString().replace ( /^\s+/, '' ) .replace ( /\s+$/, '' ).split ( /\s+/ );
 //       for ( let i = 0; i <= words_on_screen.length; i++ ) {
 //           [ word, has_y_changed ] = getCurrentWord ();
 //           console.log ( i, getX (), getY (), word );
 //           setY ( current_y );
 //           current_x = getX ();
 //           new_y = displayWord ( word, evolveWord ( word ) );
 //           setX ( current_x );
 //       }
 //       setX ( 0 );
 //       setY ( new_y );
    }

    const characterToNumber = ( character ) =>
        character !== ' '
        ? parseInt ( character )
        : 0;

    const numberToCharacter = ( number ) =>
        number !== 0 && number < 10
        ? number.toString ()
        : ' ';

    const getCurrentWord = () => {
        let current_y = getY ();
        let has_y_changed = false;

        let word_x = getX ();
        let word_y = getY ();

        let word = "";

        let current_char;

        while (
            (
                current_char
                    = snapshot ( getX (), getY (), 1, 1 ) .toString ()
            )
            == ' '
        ) {
            incrementPointer ();
            if ( getY () !== current_y ) has_y_changed = true;
        }
//        console.log ( getX (), getY () );

        while (
            (
                current_char
                    = snapshot ( getX (), getY (), 1, 1 ) .toString ()
            )
            != ' '
        ) {
            word += current_char;

            incrementPointer ();
        }
    //    incrementPointer ();

        return word
        //console.log ( getX (), getY () );
    }

    const setInitialState = ( x, y, string ) => {
        label ( x, y, string, { update: true } );

        setX ( x );
        setY ( y );
    }

    const getX = () => pointer_x;
    
    const getY = () => pointer_y;

    const setX = ( value ) => {
        pointer_x = value % CHARS_ACROSS;
    }

    const setY = ( value ) => {
        pointer_y = value % CHARS_DOWN;
    }

    const incrementPointer = () => {
        pointer_y
            = ( ++ pointer_x ) >= CHARS_ACROSS
            ? ( pointer_y + 1 ) % CHARS_DOWN
            : pointer_y;
        pointer_x %= CHARS_ACROSS;
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
        { fill: true, stroke: true, fillvalue: ' ', strokevalue: ' ' }
    );

    Automaton.setInitialState (
        Math.round ( CHARS_ACROSS / 2 ) - 40,
        1,
        '123456789'
    );

    updateDisplay ();

}

function windowResize () {
    CHARS = [];
}

function mouseMove ( e ) {
    // console.log ( e.clientX, e.clientY );
}

