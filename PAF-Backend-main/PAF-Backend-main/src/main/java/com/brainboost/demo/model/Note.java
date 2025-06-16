package com.brainboost.demo.model;

public class Note {
    private String text;
    private boolean done;

    public Note() {}
    public Note(String text, boolean done) {
        this.text = text;
        this.done = done;
    }

    public String getText() {
        return text;
    }

    public boolean isDone() {
        return done;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}
