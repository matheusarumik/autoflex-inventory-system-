package com.matheus.autoflex.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;

    // Um produto tem muitos itens na sua lista de materiais
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductMaterial> materials;
}