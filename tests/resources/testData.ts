import { generateEmail } from "../../utils/random"

export const testData = {
  stableUser: {
    email: "sa.pajic@yopmail.com",
    password: "teamH2411",
  },

  invalidUser: {
    email: "wrong@email.com",
    password: "wrongpass",
  },

  generateUser: () => {
    const timestamp = Date.now();

    return {
      name: `QA User ${timestamp}`,
      email: generateEmail(),
      password: `Pass_${timestamp}`,
      title: "Mr",
      birth_date: "1",
      birth_month: "January",
      birth_year: "1995",
      firstname: "QA",
      lastname: "User",
      company: "Automation Exercise",
      address1: "Street 1",
      address2: "",
      country: "Serbia",
      zipcode: "11000",
      state: "RS",
      city: "Belgrade",
      mobile_number: `06${timestamp.toString().slice(-8)}`,
    };
  },
};