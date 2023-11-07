myarr=("zsh" "tmux" "bin" "alacritty")
for i in "${myarr[@]}"
do
    echo "stowing $i"
    stow $i
    echo "done"
done

