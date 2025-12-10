console.log('[API-DEBUG] Función mínima iniciada.');
    response.status(200).json({ message: 'Hola desde la API simplificada.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    response.status(500).json({ error: 'Error en la función mínima', details: errorMessage });
  }
}