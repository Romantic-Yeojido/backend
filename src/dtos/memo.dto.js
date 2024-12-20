export const responseFromMemories = (body) => {
    const visit_date = new Date(body.visit_date);
    
    return {
      user_id: body.user_id,
      location_id: body.location_id,
      title: body.title || "",
      visit_date,
      friends: body.friends || "",
      content: body.content || "",
      summary: body.summary || "",
    }
}

export const responseFromGetMemories = (body) => {
  const visit_date = new Date(body.visit_date);
  
  return {
    id: body.id,
    user_id: body.user_id,
    location_id: body.location_id,
    title: body.title || "",
    visit_date,
    friends: body.friends || "",
    content: body.content || "",
    summary: body.summary || "",
    is_deleted: body.is_deleted,
    created_at: body.created_at,
    updated_at : body.updated_at, 
  }
}