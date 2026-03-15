import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  type Watch = {
    id : Nat;
    name : Text;
    brand : Text;
    priceCents : Nat;
    description : Text;
    material : Text;
    movement : Text;
    caseSize : Nat; // mm
    waterResistance : Text; // e.g. "100m"
  };

  module Watch {
    public func compare(w1 : Watch, w2 : Watch) : Order.Order {
      Nat.compare(w1.id, w2.id);
    };
  };

  let watches = Map.fromIter<Nat, Watch>(
    [
      (1, {
        id = 1;
        name = "Submariner";
        brand = "Rolex";
        priceCents = 850000;
        description = "Iconic diver's watch";
        material = "Steel";
        movement = "Automatic";
        caseSize = 41;
        waterResistance = "300m";
      }),
      (2, {
        id = 2;
        name = "Speedmaster";
        brand = "Omega";
        priceCents = 550000;
        description = "Moonwatch chronograph";
        material = "Steel";
        movement = "Manual";
        caseSize = 42;
        waterResistance = "50m";
      }),
      (3, {
        id = 3;
        name = "Carrera";
        brand = "TAG Heuer";
        priceCents = 350000;
        description = "Sporty automatic chronograph";
        material = "Steel";
        movement = "Automatic";
        caseSize = 39;
        waterResistance = "100m";
      }),
      (4, {
        id = 4;
        name = "HydroConquest";
        brand = "Longines";
        priceCents = 150000;
        description = "Classic diver's watch";
        material = "Steel";
        movement = "Automatic";
        caseSize = 41;
        waterResistance = "300m";
      }),
      (5, {
        id = 5;
        name = "Le Locle";
        brand = "Tissot";
        priceCents = 70000;
        description = "Elegant dress watch";
        material = "Steel";
        movement = "Automatic";
        caseSize = 39;
        waterResistance = "30m";
      }),
      (6, {
        id = 6;
        name = "Presage";
        brand = "Seiko";
        priceCents = 50000;
        description = "Automatic mechanical watch";
        material = "Steel";
        movement = "Automatic";
        caseSize = 40;
        waterResistance = "50m";
      }),
      (7, {
        id = 7;
        name = "Eco-Drive";
        brand = "Citizen";
        priceCents = 25000;
        description = "Solar powered watch";
        material = "Steel";
        movement = "Quartz";
        caseSize = 42;
        waterResistance = "100m";
      }),
      (8, {
        id = 8;
        name = "Bambino";
        brand = "Orient";
        priceCents = 15000;
        description = "Affordable automatic dress watch";
        material = "Steel";
        movement = "Automatic";
        caseSize = 40;
        waterResistance = "30m";
      }),
    ].values(),
  );

  type CartItem = {
    watchId : Nat;
    quantity : Nat;
  };

  module CartItem {
    public func compare(c1 : CartItem, c2 : CartItem) : Order.Order {
      Nat.compare(c1.watchId, c2.watchId);
    };
  };

  let carts = Map.empty<Principal, Map.Map<Nat, CartItem>>();

  public query ({ caller }) func getAllWatches() : async [Watch] {
    watches.values().toArray().sort();
  };

  public query ({ caller }) func getWatch(id : Nat) : async Watch {
    switch (watches.get(id)) {
      case (null) { Runtime.trap("Watch not found") };
      case (?watch) { watch };
    };
  };

  public shared ({ caller }) func addToCart(watchId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be at least 1") };
    if (not watches.containsKey(watchId)) { Runtime.trap("Watch does not exist") };

    let cart = switch (carts.get(caller)) {
      case (?existing) { existing };
      case (null) { Map.empty<Nat, CartItem>() };
    };

    let newQuantity = switch (cart.get(watchId)) {
      case (?item) { item.quantity + quantity };
      case (null) { quantity };
    };

    cart.add(watchId, { watchId; quantity = newQuantity });
    carts.add(caller, cart);
  };

  public shared ({ caller }) func removeFromCart(watchId : Nat) : async () {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        if (not cart.containsKey(watchId)) { Runtime.trap("Watch not in cart") };
        cart.remove(watchId);
      };
    };
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) {
        cart.values().toArray().sort();
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is already empty") };
      case (?_) {
        carts.remove(caller);
      };
    };
  };

  public query ({ caller }) func getCartTotalCents() : async Nat {
    switch (carts.get(caller)) {
      case (null) { return 0 };
      case (?cart) {
        var total = 0;
        for ((_, item) in cart.entries()) {
          switch (watches.get(item.watchId)) {
            case (null) {};
            case (?watch) {
              total += watch.priceCents * item.quantity;
            };
          };
        };
        total;
      };
    };
  };
};
