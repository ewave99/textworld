let controlpanel;
let bound_left = 21;

let active_line_number;

function setup () {
    CHARS = [];

    let x = Math.round ( CHARS_ACROSS / 2 ),
        y = Math.round ( CHARS_DOWN   / 2 );

    label ( x, y, '1  4  2233 4 4554 433 22' );

    updateDisplay ();

    active_line_number = y;
}

function windowResize () {
    CHARS = [];
}

function mouseMove ( e ) {
    // console.log ( e.clientX, e.clientY );
}

function nextIteration () {
    let active_line = snapshot ( 0, active_line_number, CHARS_ACROSS - 1, 1 )
        .toString ();

    let sequences = generateSequences ( active_line );

    let next_base_sequences = sequences
        .map ( elem => evolveElement ( elem ) );

    let x, y;
    let y_of_current_longest_sequence;
    let current_sequence;
    let final_sequence_label;

    for ( var index = 0; index < next_base_sequences.length; index++ ) {
        y_of_current_longest_sequence = 0;
        current_sequence = next_base_sequences [ index ];
        
        if (
            current_sequence .sequence .length
            >
            sequences [ index ] .sequence .length
        ) {
            y = active_line_number + 1;
        } else if (
            current_sequence .sequence .length
            <
            sequences [ index ] .sequence .length
        ) {
            y = active_line_number - 1;
        } else {
            y = active_line_number;
        }

        if (
            current_sequence .sequence
            >
            sequences [ index ] .sequence
        ) {
            x = current_sequence .original_position + 1;
        } else if (
            current_sequence .sequence
            <
            sequences [ index ] .sequence
        ) {
            x = current_sequence .original_position - 1;
        } else {
            x = current_sequence .original_position;
        }

        if (
            current_sequence .sequence .length 
            >=
            y_of_current_longest_sequence
        ) {
            y_of_current_longest_sequence = y;
        }

        mergeSequenceOntoCanvas ( {
            x:        x,
            y:        y,
            sequence: current_sequence .sequence
        } );

        label ( x, y, current_sequence .sequence );
    }

    active_line_number = y_of_current_longest_sequence;

    updateDisplay ();
}

function evolveElement ( elem ) {
    let new_sequence = generateNextBaseSequence ( elem.sequence );
    return {
        sequence:          new_sequence,
        original_position: elem.position
    };
}

function generateSequences ( string ) {
    string = string.replace ( /\s+$/, '' );
    let words = string.replace ( /^\s+/, '' )
                      .split   ( /\s+/      );

    let sequences = [];
    
    let regexp;

    for ( var word of words ) {
        regexp = RegExp ( "\\b(" + word + ")\\b" );

        let i = string.slice ( 0 ) .search ( regexp );

        while ( i !== -1 ) {
            sequences.push (
                {
                    sequence: word,
                    position: i
                }
            );
            i++;
            i = string.slice ( i ) .search ( regexp );
        }
    }

    return sequences;
}


function trimStringToFit ( str1, str2 ) {
    return str1.slice ( 0, str2.length );
}

function getIndexOfNextWord ( string ) {
    return string.length - string.replace ( /^\w+\s/, '' ) .length
}

function getIndexOfFirstNonWhitespaceCharacter ( string ) {
    return string.length - string.replace ( /^\s+/, '' ) .length;
}

function generateNextBaseSequence ( sequence ) {
    let tally = {};

    for ( var i of sequence ) {
        if ( Object.keys ( tally ) .indexOf ( i ) == -1 ) {
            tally [ i ] = 0;
        }
        tally [ i ] ++;
    }

    let output_list = [];

    for ( var i of Object.keys ( tally ) .sort () ) {
        let num = ( tally [ i ] < 10 ) ? tally [ i ] : ' ';
        output_list.push ( [ num, i ] );
    }

    return output_list.map ( el => el.join ( '' ) ) .join ( '' );
}

function mergeSequenceOntoCanvas ( sequence_obj ) {
    for (
        var i = sequence_obj.x;
        i < sequence_obj.x + sequence_obj.sequence.length;
        i++
    ) {
        let char_on_screen = snapshot ( i, sequence_obj.y, 1, 1 ) .toString ();
        let char_on_screen_int = char_on_screen != ' ' ? char_on_screen : '0';
        let char_in_sequence   = sequence_obj.sequence [ i ] != ' ' ? sequence_obj.sequence [ i ] : '0';

        console.log ( i, sequence_obj.y, char_in_sequence, char_on_screen_int );
    }
}
