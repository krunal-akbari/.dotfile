git remote set-url origin git@github.com:krunal-akbari/.dotfile.git
git submodule update --init --recursive
git pull --recurse-submodules
myarr=("zsh" "tmux" "bin" "alacritty" "i3")
for i in "${myarr[@]}"
do

    stow -D $i
    echo "stowing $i"
    stow $i
    echo "done"
done

