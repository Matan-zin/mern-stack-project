export const sanitizedMember = (doc) => {
    return {
        _id:   doc._id,
        name:  doc.name,
        email: doc.email,
        // used to sanitized different sources
        city:  doc.address?.city || doc.city 
    }
}

export const sanitizedMovie = (doc) => {
    return {
        _id:       doc._id, 
        name:      doc.name,
        genres:    doc.genres,
        image:     doc.image?.medium || doc.image,
        premiered: doc.premiered
    }
}

export const sanitizedSubscription = (doc) => {
    return {
        _id:      doc._id, 
        movies:   doc.movies
    }
}


export function sanitizedObj(name, doc) {
    switch(name){
        case 'members':       return sanitizedMember(doc);
        case 'movies':        return sanitizedMovie(doc);
        case 'subscriptions': return sanitizedSubscription(doc);
    }
}