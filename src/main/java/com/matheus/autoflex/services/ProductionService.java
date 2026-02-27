package com.matheus.autoflex.services;

import com.matheus.autoflex.models.*;
import com.matheus.autoflex.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ProductionService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    public List<Map<String, Object>> calculateSuggestedProduction() {
        List<Product> products = productRepository.findAll();
        products.sort((p1, p2) -> p2.getPrice().compareTo(p1.getPrice()));

        List<Map<String, Object>> suggestionReport = new ArrayList<>();

        for (Product product : products) {
            int maxPossible = calculateMaxUnits(product);
            if (maxPossible > 0) {
                Map<String, Object> item = new HashMap<>();
                item.put("productName", product.getName());
                item.put("quantityToProduce", maxPossible);
                item.put("totalValue", maxPossible * product.getPrice());
                suggestionReport.add(item);
            }
        }
        return suggestionReport;
    }

    private int calculateMaxUnits(Product product) {
        if (product.getMaterials() == null || product.getMaterials().isEmpty()) return 0;
        int minUnits = Integer.MAX_VALUE;
        for (ProductMaterial pm : product.getMaterials()) {
            int possible = (int) (pm.getRawMaterial().getStockQuantity() / pm.getQuantityRequired());
            if (possible < minUnits) minUnits = possible;
        }
        return minUnits;
    }

    @Transactional
    public void executeProductionByName(String productName, int quantity) {
        Product product = productRepository.findAll().stream()
                .filter(p -> p.getName().equalsIgnoreCase(productName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not found"));

        for (ProductMaterial pm : product.getMaterials()) {
            RawMaterial material = pm.getRawMaterial();
            double needed = pm.getQuantityRequired() * quantity;
            material.setStockQuantity(material.getStockQuantity() - needed);
            rawMaterialRepository.save(material);
        }
    }
}