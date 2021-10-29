package com.drbaltar.todoserver.Controllers;

import com.drbaltar.todoserver.Models.ToDoItem;
import com.drbaltar.todoserver.Repository.ToDoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/items")
public class ToDoController {

    private final ToDoRepository repository;

    public ToDoController(ToDoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Iterable<ToDoItem> getAllToDoItems() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<ToDoItem> getToDoItemByID(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping
    public ToDoItem saveNewToDoItem(@RequestBody ToDoItem newItem) {
        return repository.save(newItem);
    }

    @PatchMapping("/{id}")
    public Optional<ToDoItem> updateToDoItemByID(@PathVariable Long id, @RequestBody HashMap<String, String> updatedEntries) {
        final var queryResults = repository.findById(id);
        return queryResults.map(item -> repository.save(updateEntries(item, updatedEntries)));
    }

    @DeleteMapping("/{id}")
    public String deleteToDoItemsByID(@PathVariable Long id) {
        repository.deleteById(id);
        return "ToDo item %d was successfully deleted!";
    }

    private ToDoItem updateEntries(ToDoItem item, HashMap<String, String> updatedEntries) {
        updatedEntries.forEach((key, value) -> {
            if (key.equals("content"))
                item.setContent(value);
            else if (key.equals("completed"))
                item.setCompleted(Boolean.parseBoolean(value));
        });
        return item;
    }

}
