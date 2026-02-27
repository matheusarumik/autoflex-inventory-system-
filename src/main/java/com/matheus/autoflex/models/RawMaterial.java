package com.matheus.autoflex.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "raw_materials")
@Data // lambook criando o getters e setter de forma automatica
public class RawMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    //utilizei um double pois podemos ter quantidades fracionadas
    @Column(nullable = false)
    private Double stockQuantity;

    public RawMaterial() {}

    public RawMaterial(String name, Double stockQuantity) {
        this.name = name;
        this.stockQuantity = stockQuantity;
    }
}