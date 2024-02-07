package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "experienceId")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "experience_generator")
    private Long experienceId;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private Double price;

    @NotNull
    private Long userId;

    @NotNull
    private String TimeStart;

    @NotNull
    private String TimeEnd;

    @NotNull
    private LocalDate date;

    @Column(name = "`timestamp`")
    @CreationTimestamp
    private LocalDate dateExperience;

    @OneToMany(mappedBy = "experience")
    @JsonIdentityReference(alwaysAsId = true)
    private List<AssessmentExperienceData> assessments;

    @OneToMany(mappedBy = "experience", cascade = CascadeType.REMOVE)
    @JsonIdentityReference(alwaysAsId = true)
    private List<ImageExperience> images;

    @NotNull
    private Address address;

    // Getters e Setters

    public String getTimeStart() {
        return this.TimeStart;
    }

    public void setTimeStart(String TimeStart) {
        this.TimeStart = TimeStart;
    }

    public void setTimeEnd(String TimeEnd) {
        this.TimeEnd = TimeEnd;
    }

    public String getTimeEnd() {
        return this.TimeEnd;
    }

    public Long getExperienceId() {
        return this.experienceId;
    }

    public void setExperienceId(Long experienceId) {
        this.experienceId = experienceId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getDateExperience() {
        return this.dateExperience;
    }

    public void setDateExperience(LocalDate dateExperience) {
        this.dateExperience = dateExperience;
    }

    public List<AssessmentExperienceData> getAssessments() {
        return this.assessments;
    }

    public void setAssessments(List<AssessmentExperienceData> assessments) {
        this.assessments = assessments;
    }

    public List<ImageExperience> getImages() {
        return this.images;
    }

    public void setImages(List<ImageExperience> images) {
        this.images = images;
    }

    public Address getAddress() {
        return this.address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

}