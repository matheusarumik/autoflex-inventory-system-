package com.matheus.autoflex.controllers;

import com.matheus.autoflex.models.RawMaterial;
import com.matheus.autoflex.repositories.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/raw-materials") // Endereço: http://localhost:8081/api/raw-materials
@CrossOrigin(origins = "*")
public class RawMaterialController {

    @Autowired
    private RawMaterialRepository repository;

    // Listar todas as matérias-primas (RF002)
    @GetMapping
    public List<RawMaterial> getAll() {
        return repository.findAll();
    }

    // Cadastrar uma nova matéria-prima (RF002)
    @PostMapping
    public RawMaterial create(@RequestBody RawMaterial rawMaterial) {
        return repository.save(rawMaterial);
    }

    // Buscar uma matéria-prima específica pelo ID
    @GetMapping("/{id}")
    public RawMaterial getById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Material not found"));
    }

    // Deletar uma matéria-prima (RF002)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}