package com.drbaltar.todoserver;

import com.drbaltar.todoserver.Models.ToDoItem;
import com.drbaltar.todoserver.Repository.ToDoRepository;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ToDoControllerTest {
    @Autowired
    MockMvc mvc;

    @Autowired
    ToDoRepository repository;

    ToDoItem savedItem;

    @BeforeEach
    @Transactional
    @Rollback
    void setUp() {
        savedItem = saveNewItemToDB("Feed the pony");
    }

    @Test
    @Transactional
    @Rollback
    void shouldReturnToDoItemByID() throws Exception {
        final var request = get("/api/items/%d".formatted(savedItem.getId()));

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(savedItem.getId()))
                .andExpect(jsonPath("$.content").value(savedItem.getContent()))
                .andExpect(jsonPath("$.completed").value(savedItem.isCompleted()));
    }

    @Test
    @Transactional
    @Rollback
    void shouldReturnNullIfItemNotFoundByID() throws Exception {
        final var request = get("/api/items/23");

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().string("null"));
    }

    @Test
    @Transactional
    @Rollback
    void shouldCreateNewToDoItemToDB() throws Exception {
        final var testItem = """
                {
                    "content": "Feed the crab"
                }
                """;
        final var request = post("/api/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testItem);

        final var results = mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();

        var responseBody = results.getResponse().getContentAsString();
        int newItemID = JsonPath.parse(responseBody).read("$.id");
        final var item = repository.findById((long) newItemID);
        assertTrue(item.isPresent());
        assertEquals("Feed the crab", item.get().getContent());
        assertFalse(item.get().isCompleted());
    }

    @Test
    @Transactional
    @Rollback
    void shouldUpdateItemByID() throws Exception {
        final var testItem = """
                {
                    "content": "Feed the fish",
                    "completed": true
                }
                """;
        final var request = patch("/api/items/%d".formatted(savedItem.getId()))
                .contentType(MediaType.APPLICATION_JSON)
                .content(testItem);

        final var results = mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();

        var responseBody = results.getResponse().getContentAsString();
        int newItemID = JsonPath.parse(responseBody).read("$.id");
        final var item = repository.findById((long) newItemID);
        assertEquals("Feed the fish", item.get().getContent());
        assertTrue(item.get().isCompleted());
    }

    @Test
    @Transactional
    @Rollback
    void shouldDeleteItemsFromDBByID() throws Exception {
        final var request = delete("/api/items/%d".formatted(savedItem.getId()));

        mvc.perform(request)
                .andExpect(status().isOk());

        final var queryResults = repository.findById(savedItem.getId());
        assertTrue(queryResults.isEmpty());
    }

    @Test
    @Transactional
    @Rollback
    void shouldGetAllToDoItemsFromDB() throws Exception {
        saveNewItemToDB("Feed the sharks");
        saveNewItemToDB("Feed the lions");
        final var request = get("/api/items");

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(3));
    }

    private ToDoItem saveNewItemToDB(String content) {
        ToDoItem testItem = new ToDoItem(content, false);
        return repository.save(testItem);
    }
}
