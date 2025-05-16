package com.brainboost.coursemanagement.model;

import lombok.Data;

@Data
public class Module {
    private String title;
    private String content;
    private int order;
}