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