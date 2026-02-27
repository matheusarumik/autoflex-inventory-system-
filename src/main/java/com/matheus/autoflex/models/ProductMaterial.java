package com.matheus.autoflex.models;

import com.fasterxml.jackson.annotation.JsonIgnore; // Importação necessária
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product_materials")
@Data
public class ProductMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore // ISSO PARA O LOOP INFINITO
    private Product product;

    @ManyToOne
    @JoinColumn(name = "raw_material_id")
    private RawMaterial rawMaterial;

    private Double quantityRequired;
}