" Environment
" ===========

" Allow opening a new file into buffer while current file in buffer has
" changes. Reference: http://usevim.com/2012/10/19/vim101-set-hidden

set hidden

" Set leader now because it affects all later mappings

let mapleader =','

" Enable backup files

set backup

" Enable undo files

set undofile
set undodir     =$HOME/.vim/.vimundo
set viminfo     ='100,n$HOME/.vim/.viminfo
set backupdir   =/tmp
set directory   =/tmp
set viewdir     =/tmp

" Automatically save file when leaving a modified buffer

set autowriteall

" Automatically save file upon losing focus

autocmd FocusLost   * silent! wall

" Automatically save view (state) (folds, cursor, etc)

autocmd BufWinLeave * silent! mkview

" Automatically load view (state) (folds, cursor, etc)

autocmd BufWinEnter * silent! loadview


noremap <C-t> :NERDTreeToggle<CR>

" plugins
" =======

call plug#begin('~/.vim/plugged')

Plug 'tpope/vim-sensible'
Plug 'tpope/vim-repeat'

" Heuristically set buffer options

Plug 'tpope/vim-sleuth'

" Intelligently reopen files where you left off

Plug 'dietsche/vim-lastplace'

" Simplified clipboard functionality for Vim

" TODO This causes m to do what d usually does. I'm not sure I actually want
" this behaviour...
Plug 'svermeulen/vim-easyclip'

" Distraction-free writing in Vim

Plug 'junegunn/goyo.vim'

" Git integration

Plug 'tpope/vim-fugitive'

Plug 'scrooloose/nerdcommenter'
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'suan/vim-instant-markdown'
Plug 'airblade/vim-gitgutter'
Plug 'haya14busa/incsearch.vim'
Plug 'szw/vim-ctrlspace'
Plug 'reedes/vim-pencil'
Plug 'Valloric/YouCompleteMe', { 'do': './install.sh' }
Plug 'Raimondi/delimitMate'
Plug 'mhinz/vim-startify'
Plug 'henrik/vim-reveal-in-finder'
"Plug 'EinfachToll/DidYouMean'

" Improve fuzzy completion for commands. There was a discussion about this
" here: reddit.com/r/vim/comments/25n6ck/realtime_fuzzy_matching_in_the_command_line/
" Another option mentioned was paradigm/SkyBison. A UX that was referenced was
" how emacs handles command input.

Plug 'ctrlpvim/ctrlp.vim'
Plug 'fisadev/vim-ctrlp-cmdpalette'



"
" plugins / themes
"
" Reference http://cocopon.me/app/vim-color-gallery/

"Plug '29decibel/codeschool-vim-theme'
"Plug 'altercation/vim-colors-solarized'
"Plug 'jonathanfilip/vim-lucius'
"Plug 'w0ng/vim-hybrid'
"Plug 'chriskempson/base16-vim'
Plug 'chriskempson/vim-tomorrow-theme'
Plug 'vim-scripts/BusyBee'




" plugins / language
" ------------------

Plug 'gabrielelana/vim-markdown'
Plug 'pangloss/vim-javascript'
Plug 'digitaltoad/vim-jade'
Plug 'scrooloose/syntastic'
Plug 'sheerun/vim-polyglot'

" plugins / to-consider
" ---------------------
" junegunn/vim-oblique
" https://github.com/jeetsukumaran/vim-indentwise
" https://github.com/Shougo/unite.vim
" https://github.com/Lokaltog/vim-easymotion
" https://github.com/kien/rainbow_parentheses.vim
" " https://github.com/haya14busa/vim-asterisk
" https://github.com/editorconfig/editorconfig-vim
" https://github.com/marijnh/tern_for_vim
" https://github.com/goldfeld/vim-seek
" https://github.com/SirVer/ultisnips
" https://github.com/joeytwiddle/git_shade.vim
" gcmt/wildfire.vim
" q335r49/microviche
" ntpeters/vim-better-whitespace
" jeetsukumaran/vim-markology
" t9md/vim-smalls || justinmk/vim-sneak
" t9md/vim-transform
" t9md/vim-quickhl
" t9md/vim-textmanip
" Chiel92/vim-autoformat
" caigithub/a_indent
" Rykka/clickable.vim
" jaxbot/browserlink.vim
" gorkunov/smartpairs.vim
" vim-scripts/directionalWindowResizer
" kopischke/vim-stay
" haya14busa/vim-asterisk
" gabesoft/vim-ags

call plug#end()

"
" Plugin settings suan/vim-instant-markdown
"
" Control when instant markdown is launched. Default behavior is too
" aggressive. For instance when working with the static site generator Hugo
" it has its own workflow of tracking file changes and updating the live site
" etc.

let g:instant_markdown_autostart = 0

"Start an external command with a single bang

nnoremap ! :!

" clipboard
" =========

" https://github.com/svermeulen/vim-easyclip#options
let g:EasyClipAutoFormat=1
let g:EasyClipShareYanks=1
let g:EasyClipShareYanksDirectory='$HOME/.vim'


" https://github.com/svermeulen/vim-easyclip#persistent-yank-history-and-sharing-clipboard-between-concurrent-vim-instances
" > Cause all yank/delete/paste operations to use the system register *.
" This way, you can copy something in Vim then immediately paste it into
" another application. And vice versa when returning to vim.

set clipboard=unnamed



" key-bindings
" ============

" Bracket match using tab

map <tab> %

" Easier and Faster <Esc>

inoremap kj <Esc>
cnoremap kj <Esc>

"
" Plugin settings for fisadev/vim-ctrlp-cmdpalette.
"
" It is suboptimal but the best option right now seemingly. E.g. see my GH Issue #6.

map ; :
map ;; :CtrlPCmdPalette<CR>

" Enable this if we choose to automatically execute the command. The problem
" with it right now is that it cannot work with any command that accepts
" arguments such as :source etc.
" let g:ctrlp_cmdpalette_execute = 1



" u is undo so make U redo

nnoremap U <C-r>



" movement / basic
" ================

" Move to line start

nmap H ^
vmap H ^

" Move to line end
" Using g_ instead of $ will prevent from moving to end of trailing whitespace

nmap L g_
vmap L g_

" Move to file start

nnoremap J G zz
vnoremap J G zz

" Move to file end

nnoremap K gg
vnoremap K gg



" moveent / window
" ====================================================================================

nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" When moving to last line, center screen on that last line

nnoremap G G zz



" movement / cursor
" =================

" move current line to top

nnoremap zk zt

" move current line to bottom

nnoremap zj zb



" neovim-defaults
" ===============
" TODO Delete these once https://github.com/neovim/neovim/issues/276 resolved

set wildmode=list:longest




" ui
" ==

"
" Distraction-free editing
"

"
" Typography
" - http://typecast.com/blog/10-fonts-for-code
" - https://github.com/powerline/fonts
"
" set guifont=Source\ Code\ Pro:h16
" set guifont=Menlo:h16
set guifont=Meslo\ LG\ S\ DZ\ Regular\ for\ Powerline:h16
"set guifont=Fira\ Mono\ Medium\ for\ Powerline:h16


" the cursor padding at top/bot of window, prevents cursor from touching window edges

set scrolloff   =3

" Customize the cursor

set guicursor+=a:blinkon0

" Use relative line numbers to support movement but show current line number
" instead of 0 which is useless.

set number
set relativenumber

" Display a generous gutter

set numberwidth=8

" Always show the statusline

set laststatus=2

if has("gui_macvim")
  " Hide cursorline except in current window
  augroup cursorline
endif

" Disable scrollbars in graphical environments

set guioptions-=r
set guioptions-=R
set guioptions-=l
set guioptions-=L



" ui / reduce
" -----------

" Hide window-separation graphics

set fillchars=

" Hide mode display (--INSERT-- etc.)

set noshowmode





" search-replace
" --------------

set wildignore=.svn,CVS,.git,.hg,*.o,*.a,*.class,*.mo,*.la,*.so,*.obj,*.swp,*.jpg,*.png,*.xpm,*.gif,.DS_Store,*.aux,*.out,*.toc
set wildmode=list:longest

" When tapping n for next found item, center screen

nnoremap n nzz
nnoremap N Nzz


" Highlight search results

set hlsearch

map /  <Plug>(incsearch-stay)

" After a search begins, disable search highlighting on the next non-search
" related action.
" let g:incsearch#auto_nohlsearch = 1
"map n  <Plug>(inc-nohl-n)
"map N  <Plug>(search-nohl-N)
"map *  <Plug>(incsearch-nohl-*)
"map #  <Plug>(incsearch-nohl-#)
"map g* <Plug>(incsearch-nohl-g*)
"map g# <Plug>(incsearch-nohl-g#)

" Do not jump the cursor around as terms are being entered. In vim this is
" quite bad because because there is no smooth-scrolling but rather hard jumps.
" TODO: When this is used vim throws a "trailing whitespace" error on boot...
" <Plug>(search-stay)

" Replace accross all files

nnoremap R :Replace



" By default substitute all matches on a line

set gdefault


" Ensure Makefiles are indented with tabs

autocmd FileType makefile setlocal noexpandtab
autocmd FileType make setlocal noexpandtab





" Fast editing and reloading of vimrc configs

map <leader>e :edit! ~/.vimrc<cr>
autocmd! BufWritePost .vimrc source %


"colorscheme base16-marrakesh
"colorscheme base16-ocean
"colorscheme hybrid
"colorscheme busybee
colorscheme tomorrow-night-blue
"colorscheme lucius
"LuciusDarkHighContrast

" Tweak busybee theme to not have a vsplit at all
"hi VertSplit 	   guibg=#202020 gui=none ctermfg=238 ctermbg=238

" Hide tilde characters on empty screen regions

hi NonText guifg=bg ctermfg=black


if executable("ag")
  let g:ctrlspace_glob_command = 'ag -l --nocolor -g ""'
endif

let g:syntastic_javascript_checkers = ['eslint']
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

nnoremap <space> :Goyo<CR>
let g:goyo_margin_top=2
let g:goyo_margin_bottom=0

augroup pencil
  autocmd!
  autocmd FileType markdown,mkd,md call pencil#init()
  autocmd FileType text            call pencil#init()
augroup END



" http://blog.unixphilosopher.com/2015/02/a-more-betterer-autosave-in-vim.html
autocmd InsertLeave,TextChanged * if expand('%') != '' | update | endif
