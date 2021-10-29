package com.drbaltar.todoserver.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ToDoItem {

    @Id
    @GeneratedValue
    private Long id;
    private String content;
    private boolean completed;

    public ToDoItem() {
    }

    public ToDoItem(String content, boolean completed) {
        this.content = content;
        this.completed = completed;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public boolean isCompleted() {
        return completed;
    }
}
