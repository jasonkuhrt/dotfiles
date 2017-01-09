# dotfiles

My personal tool configurations



## Setup

Use a tiny script to automate linking all configs to their expected locations
(typically your home (`~`) directory).

```
./force-install.sh
```

## Additional

Certain additional steps will lead to a happier life.

* Do not ask for password every time interacting with remote git repos via
ssh

  ```
  ssh-add -K ~/.ssh/id_rsa
  ```

  [reference](http://stackoverflow.com/questions/21095054/ssh-key-still-asking-for-password-and-passphrase)
