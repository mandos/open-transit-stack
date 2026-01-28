#!/usr/bin/env sh

# TODO: Add creating session if there is no tmux. Session name should be get from $1 or be arbitrary choosen
if [ -z "$TMUX" ]; then
  echo "Looks like tmux is not working, run tmux session in project directory."
  exit 1
fi

SESSION=$(tmux display-message "#S")

tmux set-option -s remain-on-exit off
tmux rename-window -t "${SESSION}:0" workspace

tmux split-window -h 'nx watch --all -- nx run-many -t lint --outputStyle=stream --fix'

tmux new-window 'nx watch --all -- nx run-many -t test --outputStyle=stream'
tmux rename-window -t "${SESSION}:1" tests

tmux new-window 'nx watch --all -- nx run-many -t e2e --outputStyle=stream'
tmux rename-window -t "${SESSION}:2" e2e-tests

tmux select-window -t "${SESSION}:0"
tmux select-pane -t "${SESSION}:0.0"
tmux send-keys -t "${SESSION}:0.0" 'watchexec --delay-run 5s --  apps/ippo-cli/dist/ippo-cli.js show  --file=tmp/gtfs_sapporo1.000.zip --type=agency'
