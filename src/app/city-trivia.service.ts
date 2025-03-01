import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CityTriviaService {
  private apiUrl = "http://localhost:5000/api";

  async registerUser(username: string) {
    const response = await axios.post(`${this.apiUrl}/users/register`, { username });
    return response.data;
  }
  async updateUserScore(username: string, score: number) {
    const response = await axios.post(`${this.apiUrl}/users/update-score`, { username, score });
    return response.data;
  }

  async getUser(username: string) {
    const response = await axios.get(`${this.apiUrl}/users/${username}`);
    return response.data;
  }

  // Fetch a random city with multiple choice options
  async getRandomCity() {
    try {
      const response = await axios.get(`${this.apiUrl}/cities`);
      return response.data;
    } catch (error) {
      console.error("Error fetching random city:", error);
      return null;
    }
  }

  // Submit the selected answer and check if it's correct
  async sendAnswer(data: { id: string; selectedAnswer: string }) {
    try {
      const response = await axios.post(`${this.apiUrl}/cities/submit-answer`, data);
      return response; // Expected response: { correct: true/false }
    } catch (error) {
      console.error("Error submitting answer:", error);
      return { correct: false };
    }
  }
}
