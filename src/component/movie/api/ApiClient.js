import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://movie-ticket-booking-system-back-env.eba-xszgubky.ap-south-1.elasticbeanstalk.com",
  headers: {
    'Content-Type': 'application/json',
  },
});
