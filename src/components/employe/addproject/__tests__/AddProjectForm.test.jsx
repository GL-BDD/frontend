import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useAuth } from '../../../../context/AuthContext'
import AddProjectForm from '../AddProjectForm'
import React from 'react'

// Mock le hook `useAuth` pour fournir un token fictif
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}))

// Mock `fetch` globalement
global.fetch = jest.fn()

describe('AddProjectForm', () => {
  beforeEach(() => {
    // Mock le hook `useAuth` pour qu'il retourne un token fictif
    useAuth.mockReturnValue({ token: 'fake-token' })

    // Réinitialiser le mock `fetch` avant chaque test
    fetch.mockReset()
  })

  test('renders the form correctly', () => {
    render(<AddProjectForm />)

    expect(screen.getByLabelText(/Prix du projet/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Photos du projet/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Ajouter le projet/i }),
    ).toBeInTheDocument()
  })

  test('shows error message when fields are empty on submit', async () => {
    render(<AddProjectForm />)

    fireEvent.click(screen.getByRole('button', { name: /Ajouter le projet/i }))

    expect(
      await screen.findByText(/Veuillez remplir tous les champs/i),
    ).toBeInTheDocument()
  })

  test('submits the form successfully', async () => {
    // Mock `fetch` pour simuler une réponse réussie
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Projet ajouté avec succès !' }),
    })

    render(<AddProjectForm />)

    // Remplir le champ "Prix"
    const priceInput = screen.getByLabelText(/Prix du projet/i)
    fireEvent.change(priceInput, { target: { value: '500' } })

    // Ajouter des fichiers
    const fileInput = screen.getByLabelText(/Photos du projet/i)
    const file = new File(['dummy content'], 'photo.png', { type: 'image/png' })
    fireEvent.change(fileInput, { target: { files: [file] } })

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /Ajouter le projet/i }))

    // Vérifier que le bouton passe en "Ajout en cours..."
    expect(
      screen.getByRole('button', { name: /Ajout en cours/i }),
    ).toBeInTheDocument()

    // Attendre la fin de l'appel API
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
    expect(fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/artisans/project`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: `Bearer fake-token`,
        },
      }),
    )

    // Vérifier le message de succès
    expect(
      await screen.findByText(/Projet ajouté avec succès/i),
    ).toBeInTheDocument()
  })

  test('shows error message on API failure', async () => {
    // Mock `fetch` pour simuler une erreur
    fetch.mockResolvedValueOnce({
      ok: false,
      text: async () => "Erreur lors de l'ajout du projet",
    })

    render(<AddProjectForm />)

    // Remplir le champ "Prix"
    const priceInput = screen.getByLabelText(/Prix du projet/i)
    fireEvent.change(priceInput, { target: { value: '500' } })

    // Ajouter des fichiers
    const fileInput = screen.getByLabelText(/Photos du projet/i)
    const file = new File(['dummy content'], 'photo.png', { type: 'image/png' })
    fireEvent.change(fileInput, { target: { files: [file] } })

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /Ajouter le projet/i }))

    // Attendre la fin de l'appel API
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

    // Vérifier le message d'erreur
    expect(
      await screen.findByText(/Erreur lors de l'ajout du projet/i),
    ).toBeInTheDocument()
  })
})
