import React, { createContext, useState, useContext, ReactNode } from 'react'

// Définir le type pour le contexte
interface ProfessionContextType {
  selectedProfession: string
  setSelectedProfession: React.Dispatch<React.SetStateAction<string>>
}

// Créer un contexte avec le type défini
const ProfessionContext = createContext<ProfessionContextType | undefined>(
  undefined,
)

// Définir le fournisseur
function ProfessionProvider({ children }: { children: ReactNode }) {
  const [selectedProfession, setSelectedProfession] = useState<string>('')

  return (
    <ProfessionContext.Provider
      value={{ selectedProfession, setSelectedProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
function useProfession() {
  const context = useContext(ProfessionContext)
  if (!context) {
    throw new Error('useProfession must be used within a ProfessionProvider')
  }
  return context
}

export { ProfessionProvider, useProfession }
