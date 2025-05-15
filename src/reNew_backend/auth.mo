import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Result "mo:base/Result";

module {
  // User type
  public type User = {
    username: Text;
    name: Text;
    course: Text;
    age: Nat;
    passwordHash: Text;
  };

  // Simple password hashing (for demo; not secure)
  public func simpleHash(password: Text): Text {
    let chars = Text.toIter(password);
    var sum: Nat32 = 0;
    for (c in chars) {
      sum += Text.hash(Text.fromChar(c));
    };
    Nat32.toText(sum);
  };

  // Register a new user
  public func register(
    username: Text,
    name: Text,
    course: Text,
    age: Nat,
    password: Text,
    users: HashMap.HashMap<Text, User>
  ): Result.Result<Text, Text> {
    if (Text.size(username) == 0) return #err("Username cannot be empty");
    if (Text.size(name) == 0) return #err("Name cannot be empty");
    if (Text.size(course) == 0) return #err("Course cannot be empty");
    if (age == 0) return #err("Age must be greater than 0");
    if (Text.size(password) < 6) return #err("Password must be at least 6 characters");

    switch (users.get(username)) {
      case (?_) { #err("Username already taken") };
      case null {
        let passwordHash = simpleHash(password);
        let user: User = {
          username = username;
          name = name;
          course = course;
          age = age;
          passwordHash = passwordHash;
        };
        users.put(username, user);
        #ok("Registration successful")
      };
    };
  };

  // Login user
  public func login(
    username: Text,
    password: Text,
    users: HashMap.HashMap<Text, User>
  ): Result.Result<Text, Text> {
    switch (users.get(username)) {
      case (?user) {
        let inputHash = simpleHash(password);
        if (inputHash == user.passwordHash) {
          #ok("Login successful")
        } else {
          #err("Invalid password")
        }
      };
      case null {
        #err("User not found")
      };
    };
  };

  // Get user profile
  public func getProfile(
    username: Text,
    users: HashMap.HashMap<Text, User>
  ): Result.Result<User, Text> {
    switch (users.get(username)) {
      case (?user) { #ok(user) };
      case null { #err("User not found") };
    };
  };
};