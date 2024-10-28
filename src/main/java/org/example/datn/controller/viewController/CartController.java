package org.example.datn.controller.viewController;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping()
public class CartController {

    @GetMapping("/cart")
    public String cart() {
        return "customer/cart/index";
    }

    @GetMapping("/checkout")
    public String checkout() {
        return "customer/onlineSell/checkout";
    }

    @GetMapping("/payment")
    public String payment() {
        return "customer/onlineSell/payment";
    }

    @GetMapping("/bill")
    public String bill() {
        return "customer/onlineSell/bill";
    }


}
