const Automaton = ( function () {
    let pointer_x = 0,
        pointer_y = 0;

    // can't be over 10 or under 0
    let character_threshold = 10;

    let current_char;
    let current_word = '';
    let evolved_word;
    let word_on_screen;
    let merged_word;
    let change_of_y;
    let y_of_last_new_word;
    let current_word_start_x;
    let current_word_start_y;
    let evolved_word_start_x;
    let evolved_word_start_y;

    const setInitialState = ( x, y, string ) => {
        label ( x, y, string );
        updateDisplay ();

        pointer_x = x - 1;
        pointer_y = y;
    }

    const increment = () => {
        change_of_y = false;

        // increment pointer
        pointer_x++;

        if ( pointer_x > CHARS_ACROSS ) {
            pointer_y = y_of_last_new_word;
            pointer_x = 0;
            change_of_y = true;
        }

        // get character on screen (returns space if there is
        // no character)
        current_char = snapshot ( pointer_x, pointer_y, 1, 1 )
            .toString ();
        
        // if character is not a space, add it to the current word
        if ( current_char !== ' ' ) {
            if ( current_word === '' ) {
                current_word_start_x = pointer_x;
                current_word_start_y = pointer_y;

                building_word = true;
            }

            current_word += current_char;
        }
        // if character is a space and current word is not empty:
        else if ( current_char === ' ' && current_word !== '' ) {
            // 1212344 becomes 21221324
            evolved_word = evolveWord ( current_word );

            evolved_word_start_x = current_word_start_x;
            evolved_word_start_y = current_word_start_y;

            // if evolved word is longer than old word then
            // shift the evolved word along the y axis by +1
            if ( evolved_word .length > current_word .length ) {
                evolved_word_start_y += 1;
            }
            
            // else if the evolved word is shorter than the old word
            // then shift the evolved word along the y axis by -1
            else if ( evolved_word .length < current_word .length ) {
                evolved_word_start_y -= 1;
            }

            // if evolved word is alphabetically higher in value
            // (e.g. "3" > "13") then shift the evolved word
            // along the x axis by 1
            if ( evolved_word > current_word ) {
                evolved_word_start_x += 1;
            }

            // else if the evolved word is alphabetically lower
            // in value, then shift the evolved word along the
            // x axis by -1
            else if ( evolved_word < current_word ) {
                evolved_word_start_x -= 1;
            }

            //wrap around edges
            evolved_word_start_x = wrapAroundX ( evolved_word_start_x );
            evolved_word_start_y = wrapAroundY ( evolved_word_start_y );

            // retrieve the set of characters already in the span
            // of coordinates we want to place our evolved word at
            word_on_screen = snapshot (
                evolved_word_start_x,
                evolved_word_start_y,
                evolved_word .length,
                1
            ) .toString ();

            // merge the evolved word with the set of characters just retrieved
            // e.g.
            //   12131419
            //   22331415
            //   --------
            //   3446282  <- notice there is an empty space at the end
            // A space is used if the sum of the corresponding
            // characters is greater than 10
            merged_word = mergeWords ( evolved_word, word_on_screen );

            // finally overwrite the screen with the set of merged characters
            label (
                evolved_word_start_x,
                evolved_word_start_y,
                merged_word
            );
            
            // and update y_of_last_new_word
            y_of_last_new_word = evolved_word_start_y;

            // update the display
            updateDisplay ();

            // reset current word to empty string
            resetCurrentWord ();
        }
    }

    const wrapAroundX = ( value ) => {
        if ( value < 0 ) {
            value
                = CHARS_ACROSS
                - ( Math.abs ( value ) % CHARS_ACROSS );
        }
        else {
            value %= CHARS_ACROSS;
        }
        return value;
    }

    const wrapAroundY = ( value ) => {
        if ( value < 0 ) {
            value
                = CHARS_DOWN
                - ( Math.abs ( value ) % CHARS_DOWN );
        }
        else {
            value %= CHARS_DOWN;
        }
        return value;
    }

    const mergeWords = ( word_1, word_2 ) =>
        word_1 .split ( '' )
            .map (
                ( character, index ) =>
                    mergeCharacters ( character, word_2 [ index ] )
            )
            .join ( '' );

    const mergeCharacters = ( character_1, character_2 ) =>
        numberToCharacter (
            characterToNumber ( character_1 )
            + characterToNumber ( character_2 )
        );

    const resetCurrentWord = () => {
        current_word = '';
        current_word_start_x = 0;
        current_word_start_y = 0;
    }

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
                    numberToCharacter ( tally [ character ] ),
                    character
                ]
                .join ( '' )
            )
            .join ( '' );
    }

    const characterToNumber = ( character ) =>
        character !== ' '
        ? parseInt ( character )
        : 0;

    const numberToCharacter = ( number ) =>
        number !== 0 && number < character_threshold
        ? number.toString ()
        : ' ';

    return {
        increment: increment,
        setInitialState: setInitialState
    };
} ) ();

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}

function setup () {
    Automaton.setInitialState ( 20, 10, '1111111111111111111111111111111' );
}

async function draw () {
    while ( true ) {
        await sleep ( 1 );
        Automaton.increment ();
    }
}
