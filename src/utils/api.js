const API = 'http://lifestealer86.ru/api-shop';

export const loginRequest = (user) => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (!response.ok) {
                    reject();
                    return;
                }
                return response.json();
            })
            .then((result) => {
                resolve(result.data.user_token);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const signupRequest = (user) => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(data => {
                        console.log('Ошибка сервера:', response.status, data);
                        reject(data);
                    }).catch(() => {
                        console.log('Статус ошибки:', response.status);
                        reject();
                    });
                }
                return response.json();
            })
            .then((result) => {
                console.log('Успешная регистрация:', result);
                resolve(result);
            })
            .catch((error) => {
                console.log('Ошибка fetch:', error);
                reject(error);
            });
    });
};

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/products`)
            .then((response) => response.json())
            .then((result) => {
                resolve(result.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const logoutRequest = (token) => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/logout`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    reject();
                    return;
                }
                return response.json();
            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export const getOrders = () => {
    const token = localStorage.getItem('myAppToken');
    return new Promise((resolve, reject) => {
        fetch(`${API}/order`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    reject();
                    return;
                }
                return response.json();
            })
            .then((result) => {
                resolve(result.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const createOrder = () => {
    const token = localStorage.getItem('myAppToken');
    return new Promise((resolve, reject) => {
        fetch(`${API}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(data => {
                        reject(data);
                    });
                }
                return response.json();
            })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getCart = () => {
    const token = localStorage.getItem('myAppToken');
    return new Promise((resolve, reject) => {
        fetch(`${API}/cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    reject();
                    return;
                }
                return response.json();
            })
            .then((result) => {
                resolve(result.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const addToCart = (productId) => {
    const token = localStorage.getItem('myAppToken');
    return new Promise((resolve, reject) => {
        fetch(`${API}/cart/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    reject();
                    return;
                }
                return response.json();
            })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const removeFromCart = (cartId) => {
    const token = localStorage.getItem('myAppToken');
    return new Promise((resolve, reject) => {
        fetch(`${API}/cart/${cartId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    reject();
                    return;
                }
                return response.json();
            })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};