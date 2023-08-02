import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import axios from 'axios';
import MoviesList from '../src/MoviesList';
import {Alert} from 'react-native';

jest.mock('axios');

describe('CountryDetails', () => {
  const navigation = {navigate: jest.fn()};
  const route = {params: {country: 'india'}};
  render(<MoviesList navigation={navigation} route={route} />);
  test('renders country details correctly', async () => {
    const mockAxios = (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          Search: [
            {
              Title: 'Lagaan: Once Upon a Time in India',
              Year: '2001',
              imdbID: 'tt0169102',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNmYxZGJlNmQtMWY3OS00Njc0LThjODgtOWEwMWU4NTUxMDExXkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_SX300.jpg',
            },
            {
              Title: "Let's Go! India",
              Year: '2007',
              imdbID: 'tt0871510',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMTUzODMyNzk4NV5BMl5BanBnXkFtZTgwNTk1NTYyNTM@._V1_SX300.jpg',
            },
            {
              Title: 'Bhuj: The Pride of India',
              Year: '2021',
              imdbID: 'tt10062556',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BOWY0MzZkN2QtODI1MC00Nzg0LWE3YmUtNTNhMWU4YTFjOTA4XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
            },
            {
              Title: 'A Passage to India',
              Year: '1984',
              imdbID: 'tt0087892',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNzc0M2EwNWMtZDc1Zi00OGE2LThmMDItNTY5MDQ5ZDQ3ZTBmXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_SX300.jpg',
            },
            {
              Title: 'Mr. India',
              Year: '1987',
              imdbID: 'tt0093578',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BZTdhMmJjYjMtMjZmOC00NjhkLWE3MjQtODAzNDI4NmM5OTA5XkEyXkFqcGdeQXVyODAzNzAwOTU@._V1_SX300.jpg',
            },
            {
              Title: 'Mother India',
              Year: '1957',
              imdbID: 'tt0050188',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMDNmZmI5MTYtOTYzMi00OGU0LTgwYTctNGI3YThmYTNhZWM1XkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_SX300.jpg',
            },
            {
              Title: 'India Lockdown',
              Year: '2022',
              imdbID: 'tt13885320',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BOTcwYmY0NTktNzI5OC00MGEwLWFjN2EtMDc5ZDA0ZDVkMTMwXkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_SX300.jpg',
            },
            {
              Title: 'Sui Dhaaga: Made in India',
              Year: '2018',
              imdbID: 'tt7147540',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BYTRiNjg4M2ItZDg4OC00NDIxLWE0NWItYzgyMDU2NDhmNWVmXkEyXkFqcGdeQXVyMTkzOTcxOTg@._V1_SX300.jpg',
            },
            {
              Title: 'Naa Peru Surya Na Illu India',
              Year: '2018',
              imdbID: 'tt7794524',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BYzk2NWQxMTAtY2M0ZS00Y2Q4LWJlYTEtZjUwNjYyMzc2ZGFkXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg',
            },
            {
              Title: 'Son of India',
              Year: '2022',
              imdbID: 'tt13439744',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNTcxMDM2N2ItMTUxZC00MjYzLTk3NDUtYzZhYTAzOGUyNmY0XkEyXkFqcGdeQXVyMTkyNDAyNjY@._V1_SX300.jpg',
            },
          ],
          totalResults: '942',
          Response: 'True',
        },
      }),
    );
    const textInput = screen.getByPlaceholderText(
      'please enter movie name or series ',
    );
    fireEvent.changeText(textInput, 'india');
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.press(submitButton);
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?s=india&apikey=821d9eb5&page=1',
    );
    await waitFor(() => screen.getByTestId('release2001'));
    expect(screen.getByTestId('release2001')).toBeDefined();

    fireEvent.press(screen.getByTestId('moviesDetailsMother India'));

    expect(axios.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?i=tt0050188&plot=short&apikey=821d9eb5',
    );
  });

  test('when i press on prev and next button it should call the api', async () => {
    const mockAxios = (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          Search: [
            {
              Title: 'Lagaan: Once Upon a Time in India',
              Year: '2001',
              imdbID: 'tt0169102',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNmYxZGJlNmQtMWY3OS00Njc0LThjODgtOWEwMWU4NTUxMDExXkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_SX300.jpg',
            },
            {
              Title: "Let's Go! India",
              Year: '2007',
              imdbID: 'tt0871510',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMTUzODMyNzk4NV5BMl5BanBnXkFtZTgwNTk1NTYyNTM@._V1_SX300.jpg',
            },
            {
              Title: 'Bhuj: The Pride of India',
              Year: '2021',
              imdbID: 'tt10062556',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BOWY0MzZkN2QtODI1MC00Nzg0LWE3YmUtNTNhMWU4YTFjOTA4XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
            },
            {
              Title: 'A Passage to India',
              Year: '1984',
              imdbID: 'tt0087892',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNzc0M2EwNWMtZDc1Zi00OGE2LThmMDItNTY5MDQ5ZDQ3ZTBmXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_SX300.jpg',
            },
            {
              Title: 'Mr. India',
              Year: '1987',
              imdbID: 'tt0093578',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BZTdhMmJjYjMtMjZmOC00NjhkLWE3MjQtODAzNDI4NmM5OTA5XkEyXkFqcGdeQXVyODAzNzAwOTU@._V1_SX300.jpg',
            },
            {
              Title: 'Mother India',
              Year: '1957',
              imdbID: 'tt0050188',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMDNmZmI5MTYtOTYzMi00OGU0LTgwYTctNGI3YThmYTNhZWM1XkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_SX300.jpg',
            },
            {
              Title: 'India Lockdown',
              Year: '2022',
              imdbID: 'tt13885320',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BOTcwYmY0NTktNzI5OC00MGEwLWFjN2EtMDc5ZDA0ZDVkMTMwXkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_SX300.jpg',
            },
            {
              Title: 'Sui Dhaaga: Made in India',
              Year: '2018',
              imdbID: 'tt7147540',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BYTRiNjg4M2ItZDg4OC00NDIxLWE0NWItYzgyMDU2NDhmNWVmXkEyXkFqcGdeQXVyMTkzOTcxOTg@._V1_SX300.jpg',
            },
            {
              Title: 'Naa Peru Surya Na Illu India',
              Year: '2018',
              imdbID: 'tt7794524',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BYzk2NWQxMTAtY2M0ZS00Y2Q4LWJlYTEtZjUwNjYyMzc2ZGFkXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg',
            },
            {
              Title: 'Son of India',
              Year: '2022',
              imdbID: 'tt13439744',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNTcxMDM2N2ItMTUxZC00MjYzLTk3NDUtYzZhYTAzOGUyNmY0XkEyXkFqcGdeQXVyMTkyNDAyNjY@._V1_SX300.jpg',
            },
          ],
          totalResults: '942',
          Response: 'True',
        },
      }),
    );
    const navigation = {navigate: jest.fn()};
    const route = {params: {country: 'india'}};
    render(<MoviesList navigation={navigation} route={route} />);
    const textInput = screen.getByPlaceholderText(
      'please enter movie name or series ',
    );
    fireEvent.changeText(textInput, 'india');
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.press(submitButton);
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?s=india&apikey=821d9eb5&page=1',
    );
    await waitFor(() => screen.getByTestId('release2001'));
    const numberElement = screen.getByTestId('button-2');
    fireEvent.press(numberElement);
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?s=india&apikey=821d9eb5&page=2',
    );
    const prevButton = screen.getByTestId('prev-button');
    fireEvent.press(prevButton);
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?s=india&apikey=821d9eb5&page=2',
    );
    const nextButton = screen.getByTestId('next-button');
    fireEvent.press(nextButton);
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?s=india&apikey=821d9eb5&page=1',
    );
    const lastpage2 = screen.getByTestId('lastpage-2');
    fireEvent.press(lastpage2);
    const lastPage1 = screen.getByTestId('lastpage-1');
    fireEvent.press(lastPage1);
  });
  test('should handle error in catch block', async () => {
    const axiosMock = axios as jest.Mocked<typeof axios>;
    axiosMock.get.mockRejectedValueOnce(new Error('API request failed'));

    const navigation = {
      goBack: jest.fn(),
    };
    const route = {
      params: {
        asteriodId: '12345',
      },
    };
    Alert.alert = jest.fn();
    const {getByTestId} = render(
      <MoviesList navigation={navigation} route={route} />,
    );
    const textInput = screen.getByPlaceholderText(
      'please enter movie name or series ',
    );
    fireEvent.changeText(textInput, 'india');
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.press(submitButton);

    await waitFor(
      () => {
        expect(Alert.alert).toHaveBeenCalled();
      },
      {timeout: 5000},
    );
  });
  test('should handle error in catch block when i click on flatlist item', async () => {
    const mockAxios = (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          Search: [
            {
              Title: 'Lagaan: Once Upon a Time in India',
              Year: '2001',
              imdbID: 'tt0169102',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNmYxZGJlNmQtMWY3OS00Njc0LThjODgtOWEwMWU4NTUxMDExXkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_SX300.jpg',
            },
            {
              Title: "Let's Go! India",
              Year: '2007',
              imdbID: 'tt0871510',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMTUzODMyNzk4NV5BMl5BanBnXkFtZTgwNTk1NTYyNTM@._V1_SX300.jpg',
            },
            {
              Title: 'Bhuj: The Pride of India',
              Year: '2021',
              imdbID: 'tt10062556',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BOWY0MzZkN2QtODI1MC00Nzg0LWE3YmUtNTNhMWU4YTFjOTA4XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
            },
            {
              Title: 'A Passage to India',
              Year: '1984',
              imdbID: 'tt0087892',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNzc0M2EwNWMtZDc1Zi00OGE2LThmMDItNTY5MDQ5ZDQ3ZTBmXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_SX300.jpg',
            },
            {
              Title: 'Mr. India',
              Year: '1987',
              imdbID: 'tt0093578',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BZTdhMmJjYjMtMjZmOC00NjhkLWE3MjQtODAzNDI4NmM5OTA5XkEyXkFqcGdeQXVyODAzNzAwOTU@._V1_SX300.jpg',
            },
            {
              Title: 'Mother India',
              Year: '1957',
              imdbID: 'tt0050188',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMDNmZmI5MTYtOTYzMi00OGU0LTgwYTctNGI3YThmYTNhZWM1XkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_SX300.jpg',
            },
            {
              Title: 'India Lockdown',
              Year: '2022',
              imdbID: 'tt13885320',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BOTcwYmY0NTktNzI5OC00MGEwLWFjN2EtMDc5ZDA0ZDVkMTMwXkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_SX300.jpg',
            },
            {
              Title: 'Sui Dhaaga: Made in India',
              Year: '2018',
              imdbID: 'tt7147540',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BYTRiNjg4M2ItZDg4OC00NDIxLWE0NWItYzgyMDU2NDhmNWVmXkEyXkFqcGdeQXVyMTkzOTcxOTg@._V1_SX300.jpg',
            },
            {
              Title: 'Naa Peru Surya Na Illu India',
              Year: '2018',
              imdbID: 'tt7794524',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BYzk2NWQxMTAtY2M0ZS00Y2Q4LWJlYTEtZjUwNjYyMzc2ZGFkXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg',
            },
            {
              Title: 'Son of India',
              Year: '2022',
              imdbID: 'tt13439744',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNTcxMDM2N2ItMTUxZC00MjYzLTk3NDUtYzZhYTAzOGUyNmY0XkEyXkFqcGdeQXVyMTkyNDAyNjY@._V1_SX300.jpg',
            },
          ],
          totalResults: '942',
          Response: 'True',
        },
      }),
    );
    Alert.alert = jest.fn();
    const navigation = {navigate: jest.fn()};
    const route = {params: {country: 'india'}};
    render(<MoviesList navigation={navigation} route={route} />);
    const textInput = screen.getByPlaceholderText(
      'please enter movie name or series ',
    );
    fireEvent.changeText(textInput, 'india');
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.press(submitButton);
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?s=india&apikey=821d9eb5&page=1',
    );
    const axiosMock = axios as jest.Mocked<typeof axios>;
    axiosMock.get.mockRejectedValueOnce(new Error('API request failed'));
  });
});
