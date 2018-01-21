const wrap = require('word-wrap');
const map = require('lodash.map');
const longest = require('longest');
const rightPad = require('right-pad');

const filter = function (array) {
    return array.filter(function (x) {
        return x;
    });
};

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = function () {
    return {
        // When a user runs `git cz`, prompter will
        // be executed. We pass you cz, which currently
        // is just an instance of inquirer.js. Using
        // this you can ask questions and get answers.
        //
        // The commit callback should be executed when
        // you're ready to send back a commit template
        // to git.
        //
        // By default, we'll de-indent your commit
        // template and will keep empty lines.
        prompter: function (cz, commit) {
            console.log('\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n');

            // Let's ask some questions of the user
            // so that we can populate our commit
            // template.
            //
            // See inquirer.js docs for specifics.
            // You can also opt to use another input
            // collection library if you prefer.
            cz.prompt([
                {
                    type: 'input',
                    name: 'subject',
                    message: 'Write a short, imperative tense description of the change:\n'
                }
            ]).then(function (answers) {

                const maxLineWidth = 100;

                // Hard limit this line
                const head = (answers.subject.trim()).slice(0, maxLineWidth);

                commit(head);
            });
        }
    };
};
