'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function Component() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would typically make an API call to your newsletter service
    try {
      // Simulated success
      setStatus("success")
      setEmail("")
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Eureka Elearning Newsletter</CardTitle>
        <CardDescription>
          Inscrivez-vous pour recevoir mes emails privées (actualités, promotions, nouvelles formations etc.)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              "Inscription en cours..."
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                S&apos;inscrire
              </>
            )}
          </Button>
          {status === "success" && (
            <p className="text-sm text-green-600 text-center">
              Merci de votre inscription !
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600 text-center">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}