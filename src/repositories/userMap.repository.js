import { pool } from "../db.config.js";

export const getAllUserMemoryLocs = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await conn.query(`select id from users where id = ?`, [
      userId,
    ]);

    if (user.length === 0) {
      throw new Error("존재하지 않는 사용자입니다.");
    }

    const [result] = await conn.query(
      `select u.id, l.latitude, l.longitude
                from users u
                join memories m on u.id = m.user_id
                join locations l on m.location_id = l.id
            where u.id = ?;`,
      [userId]
    );

    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const getUserLocMemory = async (userId, latitude, longitude) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await conn.query(`select id from users where id = ?`, [
      userId,
    ]);

    if (user.length === 0) {
      return null;
    }

    const [locations] = await conn.query(
      `select latitude, longitude from locations where latitude = ? and longitude = ?`,
      [latitude, longitude]
    );

    if (locations.length === 0) {
      return [];
    }

    const [result] = await conn.query(
      `select m.id, m.title, m.visit_date, m.friends, m.summary, mi.image_url
        from memories m
        left join (select memory_id,
                     min(image_order) min_image_order,
                    image_url  
              from memory_images group by memory_id) mi 
        on m.id = mi.memory_id
        join locations l on m.location_id = l.id
        where m.user_id = ?
        and latitude = ? 
        and longitude = ?;`,
      [userId, latitude, longitude]
    );

    return result;
  } catch (err) {
    console.error("DB 에러:", err);
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const addPin = async (pin) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await conn.query(`select id from users where id = ?`, [
      pin.userId,
    ]);

    if (!user || user.length === 0) {
      throw new Error("존재하지 않는 사용자입니다.");
    }

    const [result] = await conn.query(
      `insert into locations (id, latitude, longitude, created_at)
      values (null, ?, ?, now())`,
      [pin.latitude, pin.longitude]
    );

    return result.insertId;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const getPin = async (pinId) => {
  const conn = await pool.getConnection();

  try {
    const [pin] = await pool.query(`select * from locations where id = ?;`, [
      pinId,
    ]);

    if (pin.length === 0) return null;

    const [locations] = await pool.query(
      `select id, latitude, longitude from locations where id = ?;`,
      [pin[0].id]
    );

    return locations[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
