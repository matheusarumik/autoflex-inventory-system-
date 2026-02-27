package com.matheus.autoflex.repositories;

import com.matheus.autoflex.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    //save(), findAll(), findById(), delete().
}