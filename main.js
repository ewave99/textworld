const Automaton = ( function () {
    let pointer_x = 0, pointer_y = 0;

    const incrementGeneration = () => {
    };

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

        return {
            x:    word_x,
            y:    word_y,
            word: word
        }
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
        getCurrentWord:   getCurrentWord,
        setInitialState:  setInitialState,
        incrementPointer: incrementPointer,
        getX:             getX,
        getY:             getY
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
        '30140159'
    );

    updateDisplay ();

}

function windowResize () {
    CHARS = [];
}

function mouseMove ( e ) {
    // console.log ( e.clientX, e.clientY );
}

