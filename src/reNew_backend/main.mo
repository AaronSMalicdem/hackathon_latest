import Auth "auth";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Result "mo:base/Result";

actor {
  // Stable storage for users: username -> User
  stable var userEntries: [(Text, Auth.User)] = [];
  let users = HashMap.fromIter<Text, Auth.User>(userEntries.vals(), 10, Text.equal, Text.hash);

  // User type (re-exported for Candid)
  public type User = Auth.User;

  // Register a new user
  public shared func register(username: Text, name: Text, course: Text, age: Nat, password: Text): async Result.Result<Text, Text> {
    let result = Auth.register(username, name, course, age, password, users);
    if (result == #ok("Registration successful")) {
      userEntries := Iter.toArray(users.entries());
    };
    result
  };

  // Login user
  public shared func login(username: Text, password: Text): async Result.Result<Text, Text> {
    Auth.login(username, password, users)
  };

  // Get user profile
  public shared func getProfile(username: Text): async Result.Result<User, Text> {
    Auth.getProfile(username, users)
  };
};