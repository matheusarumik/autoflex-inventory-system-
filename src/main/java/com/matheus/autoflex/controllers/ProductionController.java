package com.matheus.autoflex.controllers;

import com.matheus.autoflex.models.*;
import com.matheus.autoflex.repositories.*;
import com.matheus.autoflex.services.ProductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/production")
@CrossOrigin(origins = "*")
public class ProductionController {

    @Autowired
    private ProductMaterialRepository productMaterialRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private RawMaterialRepository rawMaterialRepository;
    @Autowired
    private ProductionService productionService;

    @PostMapping("/recipe/bulk")
    public List<ProductMaterial> addMultipleMaterials(@RequestBody Map<String, Object> payload) {
        Long productId = Long.valueOf(payload.get("productId").toString());
        List<Map<String, Object>> items = (List<Map<String, Object>>) payload.get("materials");

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<ProductMaterial> savedItems = new ArrayList<>();

        for (Map<String, Object> item : items) {
            Long materialId = Long.valueOf(item.get("materialId").toString());
            Double quantity = Double.valueOf(item.get("quantity").toString());

            RawMaterial material = rawMaterialRepository.findById(materialId).orElseThrow();

            ProductMaterial recipeItem = new ProductMaterial();
            recipeItem.setProduct(product);
            recipeItem.setRawMaterial(material);
            recipeItem.setQuantityRequired(quantity);

            savedItems.add(productMaterialRepository.save(recipeItem));
        }
        return savedItems;
    }

    @GetMapping("/suggestion")
    public List<Map<String, Object>> getProductionSuggestion() {
        return productionService.calculateSuggestedProduction();
    }

    @PostMapping("/execute")
    public void executeProduction(@RequestBody Map<String, Object> payload) {
        String name = payload.get("productName").toString();
        int qty = Integer.parseInt(payload.get("quantity").toString());
        productionService.executeProductionByName(name, qty);
    }
}