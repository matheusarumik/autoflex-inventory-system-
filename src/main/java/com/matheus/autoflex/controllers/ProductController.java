package com.matheus.autoflex.controllers;

import com.matheus.autoflex.models.Product;
import com.matheus.autoflex.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Avisa ao Spring que isto é uma porta de entrada para a WEB
@RequestMapping("/api/products") // Define que o endereço será http://localhost:8081/api/products
@CrossOrigin(origins = "*") // Permite que o Front-end acesse o Back-end depois
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // RF001 - Listar todos os produtos
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // RF001 - Cadastrar um novo produto
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
}