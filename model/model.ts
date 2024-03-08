export interface MovieJSON {
    movie_id: number;
    title:    string;
    year:     Date;
    plot:     string;
    poster:   string;
    genre:    string;
}

export interface PersonJSON {
    person_id: number;
    name:    string;
    biography:     Date;
    image:     string;
}

export interface StarJSON {
    person_id: number;
    movie_id: number;
}

export interface CreatorJSON {
    person_id: number;
    movie_id: number;
}