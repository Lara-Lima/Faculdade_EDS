package com.hotelJavali.hotelJavali.infrastructure.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@Entity
@AllArgsConstructor
public class ImageHosting {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "image_generator")
    private Long imageId;

    @NonNull
    private String url;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "hosting_id", nullable = true)
    private Hosting hosting;

    // Default constructor
    public ImageHosting() {
    }

    // public Long getImageId() {
    // return this.imageId;
    // }

    // public void setImageId(Long imageId) {
    // this.imageId = imageId;
    // }

    // public String getUrl() {
    // return this.url;
    // }

    // public void setUrl(String url) {
    // this.url = url;
    // }

    // public Hosting getHosting() {
    // return this.hosting;
    // }

    // public void setHosting(Hosting hosting) {
    // this.hosting = hosting;
    // }

    // public Image(Long imageId, @NonNull String url, Hosting hosting, Experience
    // experience) {
    // this.imageId = imageId;
    // this.url = url;
    // this.hosting = hosting;
    // this.experience = experience;
    // }
}
