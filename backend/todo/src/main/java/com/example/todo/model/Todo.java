package com.example.todo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "tasks")
public class Todo {
    @Id
    private String id;
    private String task;
    private String description;
    private boolean completed;
}
