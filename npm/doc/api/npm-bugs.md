npm-bugs(3) -- Bugs for a package in a web browser maybe
========================================================

## SYNOPSIS

    npm.commands.bugs(package, callback)

## DESCRIPTION

This command tries to guess at the likely location of a package's
bug tracker URL, and then tries to open it using the `--browser`
config param.

Like other commands, the first parameter is an array. This command only
uses the first element, which is expected to be a package name with an
optional version number.

This command will launch a browser, so this command may not be the most
friendly for programmatic use.
