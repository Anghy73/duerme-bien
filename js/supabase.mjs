// Conexion con la base de datos de Supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


// Inicializa el cliente de Supabase
const supabaseUrl = 'https://msqdyqebupfizqdtqmfg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcWR5cWVidXBmaXpxZHRxbWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk2OTk5NTcsImV4cCI6MjAzNTI3NTk1N30._-zbvlWm0VjX-OBiOjwX1q-jJ11867zslbhUoyzTU50';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para insertar datos
export async function insertData(tableName, data) {
    const { data: insertedData, error } = await supabase
        .from(tableName)
        .insert([data]);
    return { insertedData, error };
}

// Función para consultar datos
export async function fetchData(tableName, query = {}) {
    const { data: fetchedData, error } = await supabase
        .from(tableName)
        .select("*")
        .match(query);
    return { fetchedData, error };
}

// Función para actualizar datos
export async function updateData(tableName, updateQuery, matchQuery) {
    const { data: updatedData, error } = await supabase
        .from(tableName)
        .update(updateQuery)
        .match(matchQuery);
    return { updatedData, error };
}

// Función para eliminar datos
export async function deleteData(tableName, matchQuery) {
    const { data: deletedData, error } = await supabase
        .from(tableName)
        .delete()
        .match(matchQuery);
    return { deletedData, error };
}