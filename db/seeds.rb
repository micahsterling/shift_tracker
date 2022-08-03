# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).


organization = Organization.create([
  {
    name: "Bob's Burgers",
    hourly_rate: 10
  },
  {
    name: "Moe's Tavern",
    hourly_rate: 15
  },
  {
    name: "Sally's Sandwiches",
    hourly_rate: 20
  },
])

user = User.create([
  {
    name: "Jane Brown",
    email: "jbrown@email.com",
    password: "Password@1",
  },
  {
    name: "John Smith",
    email: "jsmith@email.com",
    password: "Password@2",
  },
  {
    name: "Ellen Jones",
    email: "ejones@email.com",
    password: "Password@3",
  },
])

shift = Shift.create([
  {
    user_id: 1,
    organization_id: 1,
    start: DateTime.new(2022,7,1,8),
    end: DateTime.new(2022,7,1,12),
  },
  {
    user_id: 2,
    organization_id: 1,
    start: DateTime.new(2022,7,2,8),
    end: DateTime.new(2022,7,2,12),
  },
  {
    user_id: 3,
    organization_id: 1,
    start: DateTime.new(2022,7,3,8),
    end: DateTime.new(2022,7,3,12),
  },
])

membership = Membership.create([
  {
    user_id: 1,
    organization_id: 1,
  },
  {
    user_id: 2,
    organization_id: 1,
  },
  {
    user_id: 3,
    organization_id: 1,
  },
])

p "data imported"