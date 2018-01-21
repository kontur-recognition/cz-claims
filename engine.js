const simpleGit = require('simple-git/promise');
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
            // Let's ask some questions of the user
            // so that we can populate our commit
            // template.
            //
            // See inquirer.js docs for specifics.
            // You can also opt to use another input
            // collection library if you prefer.
            const git = simpleGit('.');
            let savedBranch;
            git.branch()
                .then((branch) => {
                    savedBranch = branch.current;
                    if (savedBranch === 'master')
                        savedBranch = 'R-666';
                    return cz.prompt([{
                        type: 'input',
                        name: 'message',
                        message: `к коммиту будет автоматически добавлено '${savedBranch}: '`
                    }]);
                })
                .then(answers => {
                    const head = `${savedBranch}: ${answers.message.trim()}`;
                    commit(head);
                });
        }
    };
};
