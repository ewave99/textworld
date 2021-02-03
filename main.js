const Automaton = ( function () {
    let pointer_x = 0, pointer_y = 0;

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
            === ' '
        ) {
            increment ();
        }

        while (
            (
                current_char
                    = snapshot ( getX (), getY (), 1, 1 ) .toString ()
            )
            !== ' '
        ) {
            word += current_char;

            increment ();
        }

        increment ();

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

    const increment = () => {
        if ( ++pointer_x > CHARS_ACROSS ) ++pointer_y;
        pointer_x = pointer_x % CHARS_ACROSS;
        pointer_y = pointer_y % CHARS_DOWN;
    }

    return {
        getCurrentWord:  getCurrentWord,
        setInitialState: setInitialState,
        increment:       increment,
        getX:            getX,
        getY:            getY
    };
} ) ();

function setup () {
    CHARS = [];

    Automaton.setInitialState (
        Math.round ( CHARS_ACROSS / 2 ),
        Math.round ( CHARS_DOWN   / 2 ),
        '3 14 159'
    );

    updateDisplay ();

}

function windowResize () {
    CHARS = [];
}

function mouseMove ( e ) {
    // console.log ( e.clientX, e.clientY );
}

