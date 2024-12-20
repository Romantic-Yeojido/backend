// dtos/user.home.dto.js
export class RandomMemoryResponseDTO {
    constructor(memory) {
        this.title = memory.title;
        this.content = memory.content;
        this.visit_date = memory.visit_date;
        this.friends = memory.friends;
        this.images = memory.images || [];
    }
}