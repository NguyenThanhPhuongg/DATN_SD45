package org.example.datn.service;

import org.example.datn.entity.ChatLieu;
import org.example.datn.entity.MauSac;

import java.util.List;

public interface ChatLieuService {

    List<ChatLieu> findAll();
    ChatLieu findById(Long id);

    List<ChatLieu> findByCateId(Long cid);

    ChatLieu create(ChatLieu product);

    ChatLieu update(ChatLieu product);

    void delete(Long id);
}
