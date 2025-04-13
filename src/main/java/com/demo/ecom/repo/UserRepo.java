package com.demo.ecom.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.ecom.model.User;


@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

	User findByUsername(String username);
}