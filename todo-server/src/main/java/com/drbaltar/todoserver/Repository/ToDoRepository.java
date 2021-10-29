package com.drbaltar.todoserver.Repository;

import com.drbaltar.todoserver.Models.ToDoItem;
import org.springframework.data.repository.CrudRepository;

public interface ToDoRepository extends CrudRepository<ToDoItem, Long> {
}
