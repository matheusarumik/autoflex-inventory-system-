package com.matheus.autoflex.repositories;

import com.matheus.autoflex.models.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
    // metodos ex save(), findAll(), deleteById()
}